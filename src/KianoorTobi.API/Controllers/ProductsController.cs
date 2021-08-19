using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KianoorTobi.API.Dtos.Product;
using KianoorTobi.Domain.Interfaces;
using KianoorTobi.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace KianoorTobi.API.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        #region DI & Ctor

        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductsController(IMapper mapper, IProductService productService)
        {
            _mapper = mapper;
            _productService = productService;
        }

        #endregion

        #region API Functions

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAll();

            return Ok(_mapper.Map<IEnumerable<ProductOutputDto>>(products));
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        {
            var product = await _productService.GetById(id);

            if (product == null) return NotFound();

            return Ok(_mapper.Map<ProductOutputDto>(product));
        }

        [HttpGet]
        [Route("get-products-by-category/{categoryId:long}")]
        public async Task<IActionResult> GetProductsByCategory(long categoryId)
        {
            var products = await _productService.GetProductsByCategory(categoryId);

            if (!products.Any()) return NotFound();

            return Ok(_mapper.Map<IEnumerable<ProductOutputDto>>(products));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProductAddDto productDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var product = _mapper.Map<Product>(productDto);
            var productResult = await _productService.Add(product);

            if (productResult == null) return BadRequest("Duplicate Name is exist!");

            return Ok(_mapper.Map<ProductOutputDto>(productResult));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ProductEditDto productDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _productService.Update(_mapper.Map<Product>(productDto));

            return Ok(productDto);
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Remove(long id)
        {
            var product = await _productService.GetById(id);
            if (product == null) return NotFound();

            await _productService.Remove(product);

            return Ok();
        }

        [Route("search/{productName}")]
        [HttpGet]
        public async Task<ActionResult<List<Product>>> Search(string productName)
        {
            var products = _mapper.Map<List<Product>>(await _productService.Search(productName));

            if (products == null || products.Count == 0) return NotFound("None product was founded");

            return Ok(products);
        }

        [Route("search-product-with-type/{searchedValue}")]
        [HttpGet]
        public async Task<ActionResult<List<Product>>> SearchProductWithCategory(string searchedValue)
        {
            var products = _mapper.Map<List<Product>>(await _productService.SearchProductsWithType(searchedValue));

            if (!products.Any()) return NotFound("None product was founded");

            return Ok(_mapper.Map<IEnumerable<ProductOutputDto>>(products));
        }

        #endregion
    }
}
