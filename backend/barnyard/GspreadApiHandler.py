import gspread
import tornado.web

from google.auth.transport import requests
from google.oauth2 import id_token

from oauth2client.service_account import ServiceAccountCredentials

#BOM_SPREADSHEET_KEY = "1wbed8AVmHUnviFJ5UjbqFI_ShyPjAE1CBUEJyeIE8n4"
CLIENT_ID = "637060621328-uc4ag2saftdl5vr82i2jjpk1l0tk76m4.apps.googleusercontent.com"
SCOPES = ['https://spreadsheets.google.com/feeds',
          'https://www.googleapis.com/auth/drive']
SPREADSHEET_KEY = "1zRSYqFLEEHLTDiMwv_tjmZ2aUK3V4LZ9E4OVBDFX_OI"

PART_START_RANGE = "A"
PART_END_RANGE = "F"


class GspreadApiHandler(tornado.web.RequestHandler):
    bom_sheet = None
    config = {}
    work_sheet = None

    _initialized = False
    _sheets_service = None

    async def initialize(self) -> None:
        if not self._initialized:
            credentials = await ServiceAccountCredentials.from_json_keyfile_name("client_secret.json", SCOPES)

            self._sheets_service = await gspread.authorize(credentials)

            self.work_sheet = await self._sheets_service.open_by_key(SPREADSHEET_KEY)

            afondkljjbfdjdgfklfggfd

            self._initialized = True

        assert(self.bom_sheet is not None and self.work_sheet is not None)

    async def verify_login(self, token) -> str:
        try:
            id_info = await id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        except ValueError:
            return "invalid token"

