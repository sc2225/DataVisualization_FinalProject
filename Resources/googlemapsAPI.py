from googlemaps import Client as GoogleMaps

class Gmaps:
	def __init__(self, APIKey):
		self.key = APIKey
		self.Gmaps = GoogleMaps(self.key)

	def get_Region(self, address):
		try:
			Location = self.Gmaps.geocode(address)
			region = Location[0]["address_components"][7]["short_name"]
			return region
		except:
			return ""

