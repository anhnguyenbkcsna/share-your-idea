from async_poe_client import Poe_Client
from dotenv import load_dotenv
from adrf.views import APIView
from django.http import HttpResponse
from async_poe_client import Text
import os

class PoeApiView(APIView):
    async def callPoe(self, question):
        load_dotenv()
        poe_client = await Poe_Client(os.getenv("POE_TOKEN"), os.getenv("POE_FORMKEY")).create()
        async for data in poe_client.ask_stream_raw(url_botname="ChatGPT", question=question, suggest_able=False):
            if isinstance(data, Text):
                """Text response"""
                yield str(data)
    
    async def post(self, request):
        if request.data.get("question") is None:
            return HttpResponse({"message": "Please enter a question"})
        
        question = request.data["question"]
        message = ""
        async for msg in self.callPoe(question):
            message += msg
        return HttpResponse(message)
