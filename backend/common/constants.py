import os
from Project.settings import BASE_DIR
from dotenv import load_dotenv

load_dotenv()

class Role(object):
    INNOVATOR = "innovator"
    COMPANY = "company"
    ADMIN = "admin"

    @staticmethod
    def values():
        return [Role.INNOVATOR, Role.COMPANY, Role.ADMIN]


GOOGLE_AUTH_SCOPES = [
    "https://www.googleapis.com/auth/meetings.space.created",
    "https://www.googleapis.com/auth/calendar",
]
GOOGLE_ID_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo"
GOOGLE_AUTH_CREDENTIALS = os.path.join(BASE_DIR, "credentials.json")
