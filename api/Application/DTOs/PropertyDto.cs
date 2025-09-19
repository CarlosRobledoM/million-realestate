namespace Application.DTOs;
public class PropertyDto
{
    public string idProperty { get; set; } = "";
    public string idOwner { get; set; } = "";
    public string name { get; set; } = "";
    public string addressProperty { get; set; } = "";
    public decimal priceProperty { get; set; }
    public string imageUrl { get; set; } = "";
}
