from bs4 import BeautifulSoup
import requests
import openai
from googletrans import Translator

def translate_korean_to_english(text):
    translator = Translator()
    result = translator.translate(text, src='ko', dest='en')
    return result.text


keyword = input("Search:")

url = f"https://search.shopping.naver.com/search/all?query={keyword}"

user_agent = "mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/115.0.0.0 safari/537.36" 

headers = {"user-Agent" : user_agent}
req = requests.get(url, headers=headers)
html = req.text
soup = BeautifulSoup(html, "html.parser")
base_divs = soup.select_one("[class^=product_item]")

main_text_list=[]
if base_divs:
    base_div = base_divs  
    title = base_div.select_one("[class^=product_link]")
    price = base_div.select_one("[class^=price_num]")
    detail_box_div = base_div.select_one("[class^=product_detail_box]")
    img = base_div.select_one("[class^=thumbnail_thumb__Bxb6Z]")   

    title_text = title.text if title else "N/A"
    title_text1 = title_text.replace("/", "")
    english_translation = translate_korean_to_english(title_text1)
    price_text = price.get_text(" ") if price else "N/A"
    prod_text = f"{title_text} | {price_text}"

    if detail_box_div:
        detail_box_text = detail_box_div.get_text(" ")
        prod_text += f"\n{detail_box_text}"
        
    print("|-----------------------------------------------------------------------------------------------|")
    print("|                                                                                               |")
    print("|        The searched Product is being searched on Naver shopping mall.                         |")
    print("|                              Please wait a moment.                                            |")
    print("|                                                                                               |")
    print("|     AI is generating a Product description, Price, and Sales recommendation message.          |")
    print("|                                                                                               |")
    print("|-----------------------------------------------------------------------------------------------|")

else:
    print("No products found.")
    exit()

i= (img['href'])
req_i = requests.get(i, headers=headers)
html_i = req_i.text 
soup_i = BeautifulSoup(html_i, "html.parser")
base_divs_i = soup_i.select_one("[class^=image_thumb__IB9B3] img")

main_text_list.append(prod_text+"Say it in English." 
                      "Be sure to calculate the price in Singapore money(If you don't have exchange rate information, calculate 1sgd=970won). Next to the product name and only write the exchange price. just mention the Singapore price not korean price."
                      "Write one specification in one line in the product specification and write the next specification in the next line."
                      "Write one sentence line of selling point for this product.")

if base_divs_i:
    img_src = base_divs_i.get('src')
    save_path = (f"C:/Users/kjw_9/Desktop/download/{english_translation}.jpg")
    img_data = requests.get(img_src).content
    print("Image downloaded and saved.")
    print("Image Source:", img_src)
    print("Download location:",save_path)
    print("--------")
    with open(save_path, 'wb') as img_file:
     img_file.write(img_data)

else:
    print("Automatic image download failed.")
    print("Download from the address below.")
    main_text_list.append("You.need.More.Image:"+(f"https://www.google.com/search?sxsrf=AB5stBjpqrbVMrWYt39nCF8nnRg7dtILoA:1691010396511&q={title_text}&tbm=isch&source=lnms&sa=X&ved=2ahUKEwiQhvvP8L6AAxXp3jgGHTrtAIQQ0pQJegQIDBAB&cshid=1691010430312397&biw=1536&bih=715&dpr=1.25")+" In Image sentence, if there is a blank space, rewrite it by putting an '+' in it.")


openai.api_key = "YOUR OPENAI API KEY"

for main_text in main_text_list:
    user_content = main_text

    messages = [({"role": "user", "content": f"{user_content}"})]
        
    completion = openai.ChatCompletion.create( model="gpt-3.5-turbo", messages=messages) 

    answer = completion.choices[0].message["content"]

    save_path1 = (f"C:/Users/kjw_9/Desktop/download/{english_translation}.txt")
    with open(save_path1, "w") as file:
        file.write(f"GPT : {answer}\n")

    print()
    print(f"GPT : {answer}")
    print("--------")
    print("AI message downloaded and saved.")
    print("Download location:",save_path1)
    print("--------")


#상품 정보를 한국 네이버 쇼핑몰 사이트에서 정보를 찾기 때문에, 한국어로 검색하면 찾고자 하는 상품이 더 잘 나옵니다.
#Since the product information is retrieved from the Korean shopping site, searching in Korean will give you a better chance of finding the product you're looking for.
