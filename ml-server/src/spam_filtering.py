import sys
from underthesea import chunk, pos_tag
from keras.models import model_from_json
from keras.preprocessing.text import Tokenizer
from keras.preprocessing import sequence
from gensim.models import KeyedVectors
from gensim import models
from gibberish_detector import detector
from keras.src.optimizers import Adam

model_pkl_file='model/spam_filtering.pkl'
model_json_file = "model/spam_filtering.json"
model_weights_file = "model/weights.h5py"
word2vec_path='model/word2vec.vie.model.bin'
gibberish_path='model/gibberish.vie.model'
max_words = 1000
max_len = 150

class SpamFiltering:
  def __init__(self, lstm_model):
    self.tokenizer = Tokenizer(num_words=max_words)
    self.detector = detector.create_from_model(gibberish_path)
    self.lstm_model = lstm_model

  def convert_text_sequence_matrix(self, text):
    text = [text]
    self.tokenizer.fit_on_texts(text)
    text_seq = self.tokenizer.texts_to_sequences(text)
    text_seq_pad_matrix = sequence.pad_sequences(text_seq, maxlen=max_len)
    return text_seq_pad_matrix

  def is_idea_spam(self, idea_object):
    for form_input in idea_object.__dict__.values():
      is_gibberish_input = self.detector.is_gibberish(form_input)
      if (is_gibberish_input):
        return "SPAM"

    # filtering solution
    desc = idea_object.solution
    text_sequences_matrix = self.convert_text_sequence_matrix(desc)
    prediction = self.lstm_model.predict(text_sequences_matrix)
    label = "SPAM"
    if prediction > 0.5:
      label = "VALID"
    elif prediction > 0.3:
      label = "WARNING"
    print(prediction, f' -> {label} :: "{desc[:30]}..."')
    return label

class DocSimilarity:
  def __init__(self):
    self.word_vectors = KeyedVectors.load_word2vec_format(word2vec_path, binary=True)

  def get_nouns_verbs(self, doc):
    # pos_str = pos_tag(doc)
    text_group = set([word.replace(' ', '_') for word,tag,_ in chunk(doc) if tag == 'Np' or tag == 'N' or tag == 'V'])
    return text_group

  def is_document_related(self, doc1, doc2, word2vec):
    if self.word_vectors.wmdistance(doc1, doc2) > 0.5:
      return True
    word_seg_list1 = self.get_nouns_verbs(doc1)
    word_seg_list2 = self.get_nouns_verbs(doc2)
    res = []
    for w1 in word_seg_list1:
      for w2 in word_seg_list2:
        try:
          sim = word2vec.similarity(w1, w2)
          if (sim >= 0.3):
            res.append((w1, w2, sim))
        except:
          continue
    
    print(f'{res}\n -> True')
    return res

class IdeaObj:
  def __init__(self,problem='',solution='') -> None:
    self.problem=problem
    self.solution=solution

def main():
  try:
    lstm_model=None
    with open(model_json_file, 'r') as file:  
      json_model = file.read()
      lstm_model = model_from_json(json_model)
      lstm_model.load_weights(model_weights_file).expect_partial()
      lstm_model.compile(loss='binary_crossentropy',optimizer=Adam(learning_rate=1e-3),metrics=['accuracy'])
    spam = SpamFiltering(lstm_model=lstm_model)
    problem='tài chính'
    # solution="Một ứng dụng cho phép người dùng quản lí tài chính cá nhân bằng trực quan hóa số liệu và hỗ trợ quyết định đầu tư, tiết kiệm."
    solution="""Ứng dụng kết hợp với cảm biến đất, ánh sáng và nước để giám sát và quản lý cây trồng. Người dùng sẽ nhận được thông báo để tưới nước, bón phân và chăm sóc cây đúng cách, tạo điều kiện tối ưu cho sự phát triển và sức khỏe của cây."""
    idea = IdeaObj(problem=problem, solution=solution)
    spam.is_idea_spam(idea)
  except ValueError as ve:
    return str(ve)

if __name__ == '__main__':
  sys.exit(main())
  

    