import sys
import csv
from googlemapsAPI import Gmaps

#

def is_number(s):
	try:
		int(s)
		return True
	except ValueError:
		return False


api = "" # Put Google Maps API Key here
gmap = Gmaps(api)

with open("CPS_SAT_Scores.csv", "r") as f:
	reader = csv.reader(f)
	next(reader) # skip first row

	

	# SAT Scores by Zipcode
	output = open("zipCodeToSAT.csv", "w")
	output.write("zipcode,school,SAT_Score,year\n")

	for row in reader:
		if(row[0] == "2017-2018" and row[3] == "SAT"):
			region = gmap.get_Region(row[2] + ", Chicago")
			if is_number(region):
				print(region + "," + row[2] + "," + row[5] + "," + row[0])
				output.write(region + "," + row[2] + "," + row[5] + "," + row[0] + "\n")

