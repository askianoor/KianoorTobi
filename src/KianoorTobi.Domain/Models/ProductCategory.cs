using System.Collections.Generic;

namespace KianoorTobi.Domain.Models
{
    public class ProductCategory : Entity
    {
        public string Name { get; set; }

        public IEnumerable<Product> Products { get; set; }
    }
}
