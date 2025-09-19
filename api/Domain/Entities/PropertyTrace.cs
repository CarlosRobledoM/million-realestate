namespace Domain.Entities;
public class PropertyTrace
{
    public string idPropertyTrace { get; set; } = "";
    public string idProperty { get; set; } = "";
    public string dateSale { get; set; } = "";
    public string name { get; set; } = "";
    public decimal value { get; set; }
    public decimal tax { get; set; }
}
