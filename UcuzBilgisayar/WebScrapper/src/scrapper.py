from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from bs4 import BeautifulSoup
from bs4.element import Comment
import time

from copy import deepcopy

import re

import pandas as pd

# TODO: Rename score to rating and review -> review_count

class Computer:
    def __init__(self, name, brand, price, score, reviews, *args):
        self.name = name
        self.brand = brand
        self.price = price
        self.score = score
        self.reviews = reviews

    def __str__(self):
        return str(self.name + " | " + self.brand + " | " + self.price + " | " +  self.score + " | " + self.reviews)

def handle_product_name(product_name):
    return product_name.strip().lstrip()

def handle_product_brand(product_brand):
    if product_brand == "Game":
        product_brand = "Game Garaj"
    elif "MacBook" in product_brand:
        product_brand = "Apple"
    
    return product_brand

def handle_product_price(product_price):
    return product_price.replace(" TL", "").replace(".", "").replace(",", ".")

def scrap_trendyol(url):
    driver = webdriver.Firefox()
    driver.get(url)
    body = driver.page_source

    soup = BeautifulSoup(body, 'html.parser')
    product_list = soup.find_all("a", {"class": lambda L: L and L.startswith("product-card")})

    computerList = []

    for product in product_list:
        product = str(product)
        
        product_name = handle_product_name(str(re.findall(r'<span class="product-name"> <!-- -->(.*?)<', product)[0]))
        product_brand = handle_product_brand(str(re.findall(r'"product-brand">(.*?)<', product)[0]))
        
        product_price = re.findall(r'data-testid="price-section">(.*?)<', product)
        if len(product_price) > 0:
            product_price = str(product_price[0])
        else:
            product_price = re.findall(r'data-testid="sale-price">(.*?)<', product)
            if len(product_price) > 0:
                product_price = str(product_price[0])
            else:
                continue
        product_price = handle_product_price(product_price)
        
        product_score = re.findall(r' data-testid="average-rating">(.*?)<', product)
        if len(product_score) > 0:
            product_score = str(product_score[0]) + "/5"
        else:
            product_score = "?"
            continue
        
        product_review = re.findall(r'"total-count">\(<!-- -->(.*?)<!--', product)
        if len(product_review) > 0:
            product_review = str(product_review[0])
        else:
            product_review = "?"
            continue
            

        computer = Computer(product_name, product_brand, product_price, product_score, product_review)
        computerList.append(computer)
    driver.close()

    return computerList

def scrap_hepsiburada(url):
    driver = webdriver.Firefox()
    driver.get(url)
    body = driver.page_source

    soup = BeautifulSoup(body, 'html.parser')
    product_list = soup.find_all("div", {"class": lambda L: L and L.startswith("productCard-module_productCardRoot")})

    computerList = []

    for product in product_list:
        product = str(product)

        product_name = re.findall(r"title='(.*?)'", product)
        if len(product_name) > 0:
            product_name = handle_product_name(str(product_name[0]))
        else:
            continue
        
        product_brand = handle_product_brand(str(product_name.split(" ")[0]))

        # Price with sale
        product_price = re.findall(r'final-price-1">(.*?)<span', product)
        if len(product_price) == 0:
            product_price = str(re.findall(r'fiyat: (.*?) TL', product)[0])
        else:
            product_price = str(product_price[0])
        product_price = handle_product_price(product_price)

        product_score = str(re.findall(r'Ürün puanı (.*?),', product)[0]) + "/5"
        product_review = str(re.findall(r'\d+, (.*?) değerlendirme', product)[0])

        computer = Computer(product_name, product_brand, product_price, product_score, product_review)
        computerList.append(computer)
    driver.close()

    return computerList

def main():
    computerList = []
    
    computerList += scrap_hepsiburada("https://www.hepsiburada.com/ara?q=bilgisayar")
    computerList += scrap_hepsiburada("https://www.hepsiburada.com/ara?q=bilgisayar ürünleri")
    computerList += scrap_hepsiburada("https://www.hepsiburada.com/ara?q=laptop")
    computerList += scrap_hepsiburada("https://www.hepsiburada.com/ara?q=bilgisayar+aksesuarlar%C4%B1")
    computerList += scrap_trendyol("https://www.trendyol.com/sr?q=bilgisayar&qt=bilgisayar&st=bilgisayar&os=1")
    computerList += scrap_trendyol("https://www.trendyol.com/sr?q=bilgisayar&qt=bilgisayar ürünleri&st=bilgisayar&os=1")
    computerList += scrap_trendyol("https://www.trendyol.com/sr?q=bilgisayar&qt=laptop&st=bilgisayar&os=1")
    computerList += scrap_trendyol("https://www.trendyol.com/sr?q=bilgisayar&qt=bilgisayar aksesuarları&st=bilgisayar&os=1")
    
    computerList = list(set(computerList))
    
    df = pd.DataFrame([(f.name, f.brand, f.price, f.score, f.reviews) for f in computerList], columns=['Ürün adı', 'Marka', 'Fiyat (TL)', 'Ürün puanı', 'Yorum sayısı'])
    
    print(df)
    
    writer = pd.ExcelWriter("BILGISAYAR_URUNLERI.xlsx", engine="xlsxwriter")
    
    df.to_excel(writer)
    
    writer.close()

main()