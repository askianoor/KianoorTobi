using KianoorTobi.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace KianoorTobi.API.Dtos.Product
{
    public class ProductEditDto
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public ProductType Type { get; set; }

        public long ProductCategoryId { get; set; }
    }
}
