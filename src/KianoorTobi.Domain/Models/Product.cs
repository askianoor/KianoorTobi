using KianoorTobi.Domain.Enums;

namespace KianoorTobi.Domain.Models
{
    public class Product : Entity
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public ProductType Type { get; set; }
        public long ProductCategoryId { get; set; }

        public ProductCategory ProductCategory { get; set; }
    }
}
