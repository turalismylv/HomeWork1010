namespace front_to_back2.Models
{
    public class ProductComponent
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FilePath { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}
