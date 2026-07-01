using Microsoft.AspNetCore.Hosting.Server;
using System.Data;
using System.Data.OleDb;
using System.Text;
using UcuzBilgisayar;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();

public partial class ProductsHandler {
    public List<Product> products;

    public ProductsHandler()
    {
        // This is required for excel reader
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

        products = Products.ReadFromExcel("BILGISAYAR_URUNLERI.xlsx");
        products.RemoveAt(0); // First element is titles for each column so remove
    }

    public List<Product> GetProducts()
    {
        return products;
    } 
}