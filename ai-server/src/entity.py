from pydantic import BaseModel, Field
from typing import Union, List
from pydantic.functional_validators import AfterValidator
from bson import ObjectId

class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not isinstance(v, ObjectId):
            raise TypeError('ObjectId required')
        return str(v)


class IdeaObj():
  def __init__(self, problem='', solution='') -> None:
    self.problem = problem
    self.solution = solution

# class Idea(BaseModel):
#   id: Union[PydanticObjectId, str] = Field(alias="_id", default=None)
#   problem: str
#   solution: str

class Idea(BaseModel):
  id: str = Field(alias="_id", default=None)
  problem: str
  solution: str
  domain: List[str]
  professional: List[str]
  geographical: List[str]
  # ageRange: List[int]
  outstand: List[str]
  name: str
  slogan: str
  teamDescription: str
  teamExperience: str
  gender: str
  behavior: str
  apps: str
  currentDev: str
  support: str
  # files: 

class Requirement(BaseModel):
  id: str = Field(alias="_id", default=None)
  problem: str
  acceptance_criteria: str