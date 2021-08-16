using System;

namespace KianoorTobi.Domain.Interfaces.Base
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();
    }
}
