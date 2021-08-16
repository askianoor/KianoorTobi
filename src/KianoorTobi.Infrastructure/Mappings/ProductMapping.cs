using System;
using System.Collections.Generic;
using System.Text;
using KianoorTobi.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KianoorTobi.Infrastructure.Mappings
{
    public class ProductMapping : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(b => b.Id);

            builder.Property(b => b.Name)
                .IsRequired()
                .HasColumnType("varchar(150)");

            builder.Property(b => b.Type)
                .IsRequired();

            builder.Property(b => b.Price)
                .IsRequired()
                .HasColumnType("decimal(18,2)");
                //.HasPrecision(18,2);

            builder.Property(b => b.ProductCategoryId)
                .IsRequired();

            builder.ToTable("Products");
        }
    }
}
