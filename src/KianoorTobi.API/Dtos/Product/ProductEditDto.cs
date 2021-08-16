using KianoorTobi.Domain.Models;
using System.ComponentModel.DataAnnotations;
using KianoorTobi.Domain.Enums;

namespace KianoorTobi.API.Dtos.Product
{
    public class ProductEditDto
    {
        [Key]
        public long Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(150, ErrorMessage = "The field {0} must be between {2} and {1} characters", MinimumLength = 2)]
        public string Name { get; set; }

        public decimal Price { get; set; }

        public ProductType Type { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public long ProductCategoryId { get; set; }
    }
}
