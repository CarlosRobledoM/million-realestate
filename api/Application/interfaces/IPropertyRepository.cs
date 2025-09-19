using Application.DTOs;
namespace Application.Interfaces;
public interface IPropertyRepository
{
    Task<(IReadOnlyList<PropertyDto> items, long total)> SearchAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice, int page, int pageSize);
    Task<PropertyDto?> GetByIdAsync(string idProperty);
}
