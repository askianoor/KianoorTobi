using KianoorTobi.Domain.Models;
using System.ComponentModel.DataAnnotations;
using FluentValidation;
using KianoorTobi.Domain.Enums;

namespace KianoorTobi.API.Dtos.Product
{
    public class ProductAddDto
    {
        public string Name { get; set; }

        public decimal Price { get; set; }

        public ProductType Type { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public long ProductCategoryId { get; set; }
    }
}
