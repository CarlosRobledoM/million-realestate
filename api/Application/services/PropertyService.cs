using Application.Interfaces;
using Application.DTOs;
namespace Application.Services;
public class PropertyService
{
    private readonly IPropertyRepository repo;
    public PropertyService(IPropertyRepository repo) { this.repo = repo; }
    public Task<(IReadOnlyList<PropertyDto> items, long total)> SearchAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice, int page, int pageSize) => repo.SearchAsync(name, address, minPrice, maxPrice, page, pageSize);
    public Task<PropertyDto?> GetAsync(string idProperty) => repo.GetByIdAsync(idProperty);
}
