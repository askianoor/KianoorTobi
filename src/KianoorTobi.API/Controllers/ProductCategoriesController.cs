using System.Collections.Generic;
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
        private readonly IMapper _mapper;

        public ProductCategoriesController(IMapper mapper, IProductCategoryService productCategoryService)
        {
            _mapper = mapper;
            _productCategoryService = productCategoryService;
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
            var category = await _productCategoryService.GetById(id);

            if (category == null) return NotFound();

            return Ok(_mapper.Map<ProductCategoryOutputDto>(category));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ProductCategoryAddDto categoryDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var category = _mapper.Map<ProductCategory>(categoryDto);
            var categoryResult = await _productCategoryService.Add(category);

            if (categoryResult == null) return BadRequest();

            return Ok(_mapper.Map<ProductCategoryOutputDto>(categoryResult));
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(long id, ProductCategoryEditDto categoryDto)
        {
            if (id != categoryDto.Id) return BadRequest();

            if (!ModelState.IsValid) return BadRequest();

            await _productCategoryService.Update(_mapper.Map<ProductCategory>(categoryDto));

            return Ok(categoryDto);
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Remove(long id)
        {
            var category = await _productCategoryService.GetById(id);
            if (category == null) return NotFound();

            var result = await _productCategoryService.Remove(category);

            if (!result) return BadRequest();

            return Ok();
        }

        [Route("search/{category}")]
        [HttpGet]
        public async Task<ActionResult<List<ProductCategory>>> Search(string category)
        {
            var categories = _mapper.Map<List<ProductCategory>>(await _productCategoryService.Search(category));

            if (categories == null || categories.Count == 0)
                return NotFound("None product category was founded");

            return Ok(categories);
        }

        #endregion
    }
}
