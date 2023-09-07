'''
Fetches all NASDAQ-listed tickers from NASDAQ FTP server:
ftp://ftp.nasdaqtrader.com/SymbolDirectory/nasdaqtraded.txt

Parses and writes this data to a JSON file that maps a stock
symbol to its accompanying company name.
'''

from ftplib import FTP
import json
import os

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

def save_nasdaq_symbols_to_txt_file(symbols):
    with open('symbols.txt', 'w') as file:
        for symbol in symbols:
            file.write(symbol + '\n')

if __name__ == "__main__":
    get_tickers()
    symbols = get_symbols_as_list()
    save_nasdaq_symbols_to_txt_file(symbols)
   