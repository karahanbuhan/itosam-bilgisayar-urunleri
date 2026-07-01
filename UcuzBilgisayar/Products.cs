using ExcelDataReader;
using System.Collections;

namespace UcuzBilgisayar
{
    public class Product
    {
        public string name;
        public string brand;
        public string price;
        public string rating;
        public string reviews;

        public Product(string name, string brand, string price, string rating, string reviews)
        {
            this.name = name;
            this.brand = brand;
            this.price = price;
            this.rating = rating;
            this.reviews = reviews;
        }
    }

    public class Products
    {
        public static List<Product> ReadFromExcel(string filePath)
        {
            using (var stream = File.Open(filePath, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    List<Product> products = new List<Product>();

                    do
                    {
                        while (reader.Read())
                        {
                            Product product = new Product(
                                    reader.GetString(1),
                                    reader.GetString(2),
                                    reader.GetString(3),
                                    reader.GetString(4),
                                    reader.GetString(5)
                            );

                            products.Add(product);
                        }
                    } while (reader.NextResult());

                    return products;
                }
            }
        }
    }
}
