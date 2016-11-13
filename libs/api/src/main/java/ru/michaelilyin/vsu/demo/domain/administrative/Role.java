package ru.michaelilyin.vsu.demo.domain.administrative;

/**
 * Created by Michael Ilyin on 17.04.2016.
 */
public class Role {
    private Long id;
    private String name;
    private String description;
    private Boolean internal;

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

    public Boolean getInternal() {
        return internal;
    }

    public void setInternal(Boolean internal) {
        this.internal = internal;
    }
}
