using System;

namespace KianoorTobi.Domain.Models
{
    abstract class Auditable
    {
        public long CreatedBy { get; set; }

        public DateTime CreatedOnUtc { get; set; }

        public long LastModifiedBy { get; set; }

        public DateTime? LastModifiedOnUtc { get; set; }

        public string IPAddress { get; set; }

        public bool IsDeleted { get; set; }
    }
}
