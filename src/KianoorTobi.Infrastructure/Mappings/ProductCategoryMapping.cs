using KianoorTobi.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KianoorTobi.Infrastructure.Mappings
{
    public class ProductCategoryMapping : IEntityTypeConfiguration<ProductCategory>
    {
        public void Configure(EntityTypeBuilder<ProductCategory> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasColumnType("varchar(150)");

            builder.HasMany(c => c.Products)
                .WithOne(b => b.ProductCategory)
                .HasForeignKey(b => b.ProductCategoryId);

            builder.ToTable("ProductCategories");
        }
    }
}
