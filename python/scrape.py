from bs4 import BeautifulSoup
import requests
import re

urls_to_parse = ["http://www.segundamano.mx/distrito-federal/renta_inmuebles?ca=11_s&q=Renta%20de%20locales%20comerciales&cg=1040&et=1&et=4&o=7",
"http://casas.trovit.com.mx/renta-local-comercial-mexico-df"]

def parse_segundamano(url):
  response = requests.get(url)
  soup = BeautifulSoup(response.content)
  all_properties = []
  all_listings = soup.find_all("div", class_="listing_thumbs_row")
  for listing in all_listings:
    listing_hash = {}
    try:
      listing_hash["rent"] = parse_price(listing.find("div", "row_price").string)
    except:
      listing_hash["rent"] = 0
    try:
      listing_hash["image"] = listing.find("img", "lazy").attrs['data-original'].replace("listing", "images")
    except:
      listing_hash["image"] = ""
    listing_hash["name"] = listing.find("span", "row_title").string
    listing_hash["size"] = get_size(listing.find("a", "listing_container")["href"])
    listing_hash["add1"] = listing.find("div", "listing_row_location").find_all("div", "row_info")[1].string
    listing_hash["city"] = listing.find("div", "listing_row_location").find_all("div", "row_info")[0].string
    listing_hash["state"] = "Distrito Federal"
    all_properties.append(listing_hash)

  save_to_db(all_properties)

def parse_trovit(url):
  return

def parse_price(price):
  price_digits = re.findall("\d", price)
  return int("".join(price_digits))

def get_size(url):
  resp = requests.get(url)
  detail = BeautifulSoup(resp.content)
  try:
    return parse_price(detail.find("ul", "left_col").find("li").find("strong").string)
  except:
    return ""

def save_to_db(properties):
  print "saving property"
  api_url = "http://localhost:3000/post_property"
  for property in properties:
    requests.post(api_url, data=property)

parse_segundamano(urls_to_parse[0])