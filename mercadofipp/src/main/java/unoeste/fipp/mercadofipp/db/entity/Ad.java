package unoeste.fipp.mercadofipp.db.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "anuncio")
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "anu_id")
    private Long Id;
    @Column(name = "anu_title")
    private String title;
    @Column(name = "anu_date")
    private LocalDate date;
    @Column(name = "anu_desc")
    private String descr;
    @Column(name = "anu_price")
    private double price;
    @ManyToOne
    @JoinColumn(name="cat_id",nullable = false)
    private Category category;
    @ManyToOne
    @JoinColumn(name = "usr_id",nullable = false)
    private User user;

    @OneToMany(mappedBy = "ad")
    private List<Photo> fotos;



    @OneToMany(mappedBy = "ad")
    private List<Question> perguntas;

    public Ad(Long id, String title, LocalDate date, String descr, double price, Category category, User user, List <Photo> fotos,
              List <Question> perguntas) {
        Id = id;
        this.title = title;
        this.date = date;
        this.descr = descr;
        this.price = price;
        this.category = category;
        this.user = user;
        this.fotos=fotos;
        this.perguntas=perguntas;
    }

    public Ad() {
        this(0L,"",LocalDate.now(),"",0,null,null,null,null);
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Photo> getFotos() {
        return fotos;
    }

    public void setFotos(List<Photo> fotos) {
        this.fotos = fotos;
    }
    public List<Question> getPerguntas() {
        return perguntas;
    }

    public void setPerguntas(List<Question> perguntas) {
        this.perguntas = perguntas;
    }
}
