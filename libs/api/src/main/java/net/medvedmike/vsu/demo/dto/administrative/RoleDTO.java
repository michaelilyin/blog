package net.medvedmike.vsu.demo.dto.administrative;

import net.medvedmike.vsu.demo.domain.administrative.Role;

/**
 * Created by Michael Ilyin on 17.04.2016.
 */
public class RoleDTO {
    private Long id;
    private String name;
    private String description;

    public RoleDTO() {

    }

    public RoleDTO(Role domain) {
        id = domain.getId();
        name = domain.getName();
        description = domain.getDescription();
    }

    public Role toModel() {
        Role role = new Role();
        role.setId(id);
        role.setName(name);
        role.setDescription(description);
        return role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
