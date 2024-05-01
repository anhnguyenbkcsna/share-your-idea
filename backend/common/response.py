from rest_framework.response import Response


class CustomResponse(Response):
    def __init__(self, message=None, data=None, status=200, **kwargs):
      returnDat = {}
      if message:
        returnDat["message"] = message
      if data:
        returnDat["data"] = data
      
      super().__init__(returnDat, status=status, **kwargs)
