using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KianoorTobi.Domain.Enums;
using KianoorTobi.Domain.Models;

namespace KianoorTobi.API.Dtos.Product
{
    public class ProductOutputDto
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public ProductType Type { get; set; }

        public long ProductCategoryId { get; set; }

        public string ProductCategoryName { get; set; }
    }
}
