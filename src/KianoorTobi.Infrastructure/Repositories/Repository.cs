using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using KianoorTobi.Domain.Interfaces;
using KianoorTobi.Domain.Models;
using KianoorTobi.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace KianoorTobi.Infrastructure.Repositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        protected readonly KianoorTobiDbContext Db;
        private readonly DbSet<TEntity> _dbSet;

        protected Repository(KianoorTobiDbContext db)
        {
            Db = db;
            _dbSet = db.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> Search(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public virtual async Task<TEntity> GetById(long id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual async Task<List<TEntity>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task Add(TEntity entity)
        {
            _dbSet.Add(entity);
        }

        public virtual async Task Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public virtual async Task Remove(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public void Dispose()
        {
            Db?.Dispose();
        }
    }
}