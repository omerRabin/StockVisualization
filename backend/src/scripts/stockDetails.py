'''
Fetches all NASDAQ-listed tickers from NASDAQ FTP server:
ftp://ftp.nasdaqtrader.com/SymbolDirectory/nasdaqtraded.txt

Parses and writes this data to a JSON file that maps a stock
symbol to its accompanying company name.
'''

from ftplib import FTP
import os
import requests
import pymongo  


temp_data_file = "temp_nasdaq_data.txt"
json_filename = "symbols.json"


def get_tickers():
    with FTP("ftp.nasdaqtrader.com") as ftp:
        ftp.login()
        ftp.cwd("SymbolDirectory")
        with open(temp_data_file, "wb") as f:
            ftp.retrbinary("RETR nasdaqtraded.txt", f.write)


def get_symbols_as_list():
    symbols = []
    with open(temp_data_file, "r") as f:
        next(f)  # ignore header
        for line in f:
            line_components = line.split("|")
            # ignore blank lines and final line (file creation time)
            if len(line_components[0]) != 1:
                continue
            symbols.append(line_components[1].replace('$', '-'))
    
    os.remove(temp_data_file)
    return symbols

def save_nasdaq_symbols_to_js_file(symbols):
    with open('symbols.ts', 'w') as file:
        file.write('export const symbols = [')
        for symbol in symbols:
            file.write(f"'{symbol}'" + ',\n')
        file.write(']')


mongo_url = "mongodb://localhost:27017" 
mongo_db_name = "local" 
collection_name = "stockDetails"

# Function to fetch stock details from the API
def get_stock_details(symbol):
    finnhub_api_key = "cimp6npr01qhp3kco6qgcimp6npr01qhp3kco6r0" 
    finnhub_search_route = f"https://finnhub.io/api/v1/search?q={symbol}&token={finnhub_api_key}"
    
    try:
        response = requests.get(finnhub_search_route)
        data = response.json()
        if data['count'] > 0:
            description = data['result'][0]['description']
            return {"symbol": symbol, "companyName": description}
        else:
            return {"symbol": symbol, "companyName": ""}
    except Exception as e:
        print(f"Error fetching stock details for {symbol}: {str(e)}")
        return {"symbol": symbol, "companyName": ""}


def is_stock_exist(symbol, company_name, collection):
    existing_document = collection.find_one({"symbol": symbol, "companyName": company_name})
    return existing_document is not None

# Function to insert stock details into MongoDB
def insert_stock_details(stock_details):
    client = pymongo.MongoClient(mongo_url)
    db = client[mongo_db_name]
    collection = db[collection_name]
    
    try:
        if not is_stock_exist(stock_details["symbol"], stock_details["companyName"], collection):
            result = collection.insert_one(stock_details)
            print(f"Document inserted successfully: {result.inserted_id}")
    except Exception as e:
        print(f"Error inserting document: {str(e)}")

if __name__ == "__main__":
    get_tickers()
    symbols = get_symbols_as_list()
    save_nasdaq_symbols_to_js_file(symbols)
    for symbol in symbols:
        stock_details = get_stock_details(symbol)
        insert_stock_details(stock_details)