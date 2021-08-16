using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using KianoorTobi.Domain.Models;

namespace KianoorTobi.Domain.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : Entity
    {
        Task Add(TEntity entity);
        Task<List<TEntity>> GetAll();
        Task<TEntity> GetById(long id);
        Task Update(TEntity entity);
        Task Remove(TEntity entity);
        Task<IEnumerable<TEntity>> Search(Expression<Func<TEntity, bool>> predicate);
    }
}