import numpy as np
import json
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing import sequence
from tensorflow.keras.models import load_model, save_model
from gibberish_detector import detector
from filtering_data import get_data_by_column
from entity import Idea, IdeaObj
import os

gibberish_path= './model/gibberish.vie.model'
filtering_model_path = './model/saved_model.keras'
max_words = 1000
max_len = 150

class IdeaTokenize:
  def __init__(self) -> None:
    self.tokenizer = Tokenizer(num_words=max_words)

    dataset_vocab = get_data_by_column('sentence')
    self.tokenizer.fit_on_texts(dataset_vocab)

  def tokenize_text(self, text):
    text = [text]
    # self.tokenizer.fit_on_texts(text)
    text_seq = self.tokenizer.texts_to_sequences(text)
    text_seq_pad_matrix = sequence.pad_sequences(text_seq, maxlen=max_len)
    return text_seq_pad_matrix

class FilteringModel:
  def __init__(self) -> None:
    self.detector = detector.create_from_model(gibberish_path)
    self.lstm_model = load_model(filtering_model_path)
    self.tok = IdeaTokenize()
  
  def predict(self, idea_object: Idea):
    idea_dict = idea_object.dict()
    idea_solution = idea_object.solution
    idea_id = idea_object.id
    label = 'VALID'
    result = {
      "label": label,
      "_id": idea_id,
      "error": ''
    }
    for key, form_input in idea_dict.items():
      if key != 'id':
        if (isinstance(form_input, list)):
          for input in form_input:
            is_gibberish_input = self.detector.is_gibberish(input)
            if (is_gibberish_input):
              print('==== GIBBERISH DETECT')
              result["label"] = "SPAM"
              result["error"] = key
              return result
        else:
          is_gibberish_input = self.detector.is_gibberish(form_input)
          if (is_gibberish_input):
            print('==== GIBBERISH DETECT')
            result["label"] = "SPAM"
            result["error"] = key
            return result

    # filtering solution
    
    tok_solution = self.tok.tokenize_text(idea_solution)
    prediction = self.lstm_model.predict(tok_solution)
    label = "SPAM"
    if prediction > 0.75:
      label = "VALID"
    elif prediction > 0.4:
      label = "WARNING"
    print(prediction, f' -> {label} :: "{idea_solution}..."')
    result["label"] = label
    return result