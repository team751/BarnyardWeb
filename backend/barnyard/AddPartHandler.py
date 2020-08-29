import gspread
import tornado.web
import uuid

from barnyard.GspreadApiHandler import GspreadApiHandler, PART_START_RANGE, PART_END_RANGE


class AddPartHandler(GspreadApiHandler):
    async def _add_part(self, uuid_str: str, name: str, description: str, location: str, image_url: str,
                        component_group: str) -> None:
        # TODO(Bobby): Add component group name whitelist verification

        part_sheet = self.work_sheet.sheet1

        parts_found = len(await part_sheet.col_values(1))

        batch_dict = {
            "range": PART_START_RANGE + str(parts_found + 1) + ":" + PART_END_RANGE + str(parts_found + 1),
            "values": [[uuid_str, name, description, location, image_url, component_group]]
        }

        await part_sheet.batch_update(batch_dict)

    async def _add_part_to_bom(self, name: str, description: str, location: str, image_url: str,
                               component_group: str) -> None:
        await self._add_part(name, description, location, image_url, component_group)

    @tornado.web.asynchronous
    async def post(self):
        await self.initialize()

        add_bom = self.get_argument("add_bom", "")
        component_group = self.get_argument("component_group")
        description = self.get_argument("description")
        image_url = self.get_argument("image_url")
        location = self.get_argument("location")
        name = self.get_argument("name")
        uuid_str = "tempuuid-" + str(uuid.uuid4())

        await self._add_part(uuid_str, name, description, location, image_url, component_group)

        if bool(add_bom):
            item_name = self.get_argument("item_name", "")
            price_per_item = self.get_argument("price_per_item")
            quantity = self.get_argument("quantity")
            robot = bool(self.get_argument("robot", ""))
            exempt = bool(self.get_argument("exempt", ""))
            owned = bool(self.get_argument("owned", ""))
            order_link = self.get_argument()

            await self._add_part_to_bom(uuid_str, name, item_name)

        await self.finish()
