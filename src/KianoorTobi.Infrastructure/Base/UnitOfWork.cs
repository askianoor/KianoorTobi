using KianoorTobi.Domain.Interfaces.Base;
using KianoorTobi.Infrastructure.Context;

namespace KianoorTobi.Infrastructure.Base
{
    public class UnitOfWork : IUnitOfWork
    {
        private KianoorTobiDbContext Context { get; }

        public UnitOfWork(KianoorTobiDbContext context)
        {
            Context = context;
        }

        public void Commit()
        {
            Context.SaveChanges();
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
