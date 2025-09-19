namespace Domain.Entities;

public class Property
{
    public string idProperty { get; set; } = "";
    public string idOwner { get; set; } = "";
    public string name { get; set; } = "";
    public string addressProperty { get; set; } = "";
    public decimal priceProperty { get; set; }
    public string codeInternal { get; set; } = "";
    public int year { get; set; }
}
