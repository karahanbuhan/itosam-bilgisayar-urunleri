# İTOSAM - Bilgisayar Ürünleri
Selenium kullanarak Hepsiburada, Trendyol sitelerinden bilgisayar ürünlerini aratır ve BeautifulSoup4 ile veri kazıma işlemi gerçekleştirir. Kazınan veriler Excel formatında (.xlsx) saklanır ve ASP.NET ile geliştirilmiş web uygulamasında bir tema ile sunulur, istenilen ürünler aratılabilir.

## Ekran Görüntüsü
<img width="1267" height="692" alt="Screenshot 2026-07-03 161326" src="https://github.com/user-attachments/assets/23e4e59b-1d72-4268-8c80-77fd42d81d02" />

## Verilerden Bir Kare
Şu anda yaklaşık 100 adet bilgisayar ürünü verisi kazılmıştır, bu miktar gerekirse arttırılacak ve dinamik hale getirilecektir.

<img width="509" height="543" alt="Screenshot 2026-07-01 120052" src="https://github.com/user-attachments/assets/05dc94a1-0994-4814-92df-15975c87443e" />

## Kurulum
ASP.NET kullanarak web üzerinden sayfayı hostlamadan önce Python ile yazılmış veri kazımacıyı çalıştırmanız gerekmektedir. Yine de IDE olarak Visual Studio üzerinden projenin GitHub adresi kullanılarak klonlanması ve başlatılması önerilir. Ayrıca ASP.NET, Python gibi gerekli frameworkleri Visual Studio Installer üzerinden indirmeniz gerekmektedir.

0. Visual Studio ile File > Clone Repository seçeneğini seçin. Repository location olarak bu repository'nin adresini yani https://github.com/karahanbuhan/itosam-bilgisayar-urunleri.git girin ve uygun dizini seçtikten sonra Clone butonuna basın.
1. WebScrapper/src klasöründeki `scrapper.py` kazıcı script'ini çalıştırın. Proje dizininde yeni bir terminal açıp şu komutları yazabilirsiniz:
```Bash
cd BilgisayarUrunleri/WebScrapper
python -m pip install -r requirements.txt
python ./src/scrapper.py
```
*Komutun çalıştırılması yaklaşık 1-4 dakika sürebilir. Eğer 1 dakika beklemenize rağmen %10, %20 gibi artış değerlerini terminalde göremiyorsanız Hepsi Burada veya Trendyol'un ürün sayfası yapıları değişmiş olabilir ki bunu gerçekleşmesi birkaç ay veya yıl içinde muhtemeldir. Proje en son 15.07.2026 tarihinde test edilmiştir ve şu anda kazıma fonksiyonları çalışmaktadır ve başka adresler için de kullanılabilir.*

2. Excel çıktısı WebScrapper/BILGISAYAR_URUNLERI.xlsx olarak kaydedilmektedir, bu çıktının elle (manuel) ana çözüme konması gerekmektedir. Yani Program.cs ve Product.cs ile aynı dizinde olması gerekmektedir, yan yana konmalıdır.

3. Visual Studio çalıştırma butonu ile (https veya http yazısı da olur) proje çalıştırılabilir ve ASP.NET üzerinden web sayfasına girilebilir.

**P.S.** Soldaki butonlar ve sıralama/filtreleme özelliği kullanım dışıdır. Geliştirme ekstra olarak bizim tarafımızdan geliştirilirken projenin askıya alınmasıyla ve başka bir projeye geçmemiz nedeniyle durdurulmuştur. Şefimizden istenen gereksinimler karşılanmıştır.
