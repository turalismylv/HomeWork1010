namespace front_to_back2.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<ProductComponent> ProductComponents { get; set; }
    }
}
