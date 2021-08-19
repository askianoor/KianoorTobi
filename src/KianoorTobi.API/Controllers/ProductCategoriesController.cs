using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KianoorTobi.API.Dtos.ProductCategory;
using KianoorTobi.Domain.Interfaces;
using KianoorTobi.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace KianoorTobi.API.Controllers
{
    [Route("api/[controller]")]
    public class ProductCategoriesController : Controller
    {
        #region DI & Ctor

        private readonly IProductCategoryService _productCategoryService;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductCategoriesController(
            IMapper mapper, 
            IProductCategoryService productCategoryService,
            IProductService productService)
        {
            _mapper = mapper;
            _productCategoryService = productCategoryService;
            _productService = productService;
        }

        #endregion

        #region API Functions

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _productCategoryService.GetAll();

            return Ok(_mapper.Map<IEnumerable<ProductCategoryOutputDto>>(categories));
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        {
            var productCategory = await _productCategoryService.GetById(id);

            if (productCategory == null) return NotFound();

            return Ok(_mapper.Map<ProductCategoryOutputDto>(productCategory));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]ProductCategoryAddDto productCategoryDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var productCategory = _mapper.Map<ProductCategory>(productCategoryDto);
            var productCategoryResult = await _productCategoryService.Add(productCategory);

            if (productCategoryResult == null) return BadRequest("Duplicate Name is exist!");

            return Ok(_mapper.Map<ProductCategoryOutputDto>(productCategoryResult));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]ProductCategoryEditDto productCategoryDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _productCategoryService.Update(_mapper.Map<ProductCategory>(productCategoryDto));

            return Ok(productCategoryDto);
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Remove(long id)
        {
            var productCategory = await _productCategoryService.GetById(id);
            if (productCategory == null) return NotFound();

            var checkForProducts =await _productService.GetProductsByCategory(productCategory.Id);

            if (checkForProducts.Any())
            {
                return BadRequest("You can't delete a category with items, please delete the products first");
            }

            var result = await _productCategoryService.Remove(productCategory);

            if (!result) return BadRequest();

            return Ok();
        }

        [Route("search/{productCategory}")]
        [HttpGet]
        public async Task<ActionResult<List<ProductCategory>>> Search(string productCategory)
        {
            var categories = _mapper.Map<List<ProductCategory>>(await _productCategoryService.Search(productCategory));

            if (categories == null || categories.Count == 0)
                return NotFound("None product of this category was founded");

            return Ok(categories);
        }

        #endregion
    }
}
