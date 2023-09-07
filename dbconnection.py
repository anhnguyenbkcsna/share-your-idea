from pymongo import MongoClient

URI = "mongodb+srv://manhnguyenkimewaza:manh4949@cluster0.iwnzpbk.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(URI)
client.close()