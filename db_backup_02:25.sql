PGDMP         "                {            movie_db    15.1    15.1 "    4           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            5           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            6           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            7           1262    16399    movie_db    DATABASE     j   CREATE DATABASE movie_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE movie_db;
                postgres    false            ?            1259    16478    customer    TABLE     
  CREATE TABLE public.customer (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    phone character varying,
    address character varying,
    password character varying(255)
);
    DROP TABLE public.customer;
       public         heap    postgres    false            ?            1259    16434    movie    TABLE     ?   CREATE TABLE public.movie (
    id integer NOT NULL,
    title character varying(255),
    release_date date,
    duration integer,
    genre character varying(255),
    description character varying(255),
    age_restriction integer
);
    DROP TABLE public.movie;
       public         heap    postgres    false            ?            1259    16495    rating    TABLE     ?   CREATE TABLE public.rating (
    id integer NOT NULL,
    movie_id integer,
    customer_id integer,
    rating integer,
    review text
);
    DROP TABLE public.rating;
       public         heap    postgres    false            ?            1259    16485    seat    TABLE     ?   CREATE TABLE public.seat (
    id integer NOT NULL,
    "row" character varying,
    number integer,
    type character varying(255),
    removable boolean,
    theater_id integer
);
    DROP TABLE public.seat;
       public         heap    postgres    false            ?            1259    16448 	   showtimes    TABLE     ?   CREATE TABLE public.showtimes (
    id integer NOT NULL,
    movie_id integer,
    theater_id integer,
    start_time time without time zone,
    date date
);
    DROP TABLE public.showtimes;
       public         heap    postgres    false            ?            1259    16441    theater    TABLE     ?   CREATE TABLE public.theater (
    id integer NOT NULL,
    name character varying(255),
    capacity integer,
    features character varying[]
);
    DROP TABLE public.theater;
       public         heap    postgres    false            ?            1259    16463    ticket    TABLE     ?   CREATE TABLE public.ticket (
    id integer NOT NULL,
    price numeric(5,2),
    movie_id integer,
    show_id integer,
    seat_id integer,
    customer_id integer
);
    DROP TABLE public.ticket;
       public         heap    postgres    false            /          0    16478    customer 
   TABLE DATA           ^   COPY public.customer (id, first_name, last_name, email, phone, address, password) FROM stdin;
    public          postgres    false    218   ?'       +          0    16434    movie 
   TABLE DATA           g   COPY public.movie (id, title, release_date, duration, genre, description, age_restriction) FROM stdin;
    public          postgres    false    214   ?(       1          0    16495    rating 
   TABLE DATA           K   COPY public.rating (id, movie_id, customer_id, rating, review) FROM stdin;
    public          postgres    false    220   ?*       0          0    16485    seat 
   TABLE DATA           N   COPY public.seat (id, "row", number, type, removable, theater_id) FROM stdin;
    public          postgres    false    219   _,       -          0    16448 	   showtimes 
   TABLE DATA           O   COPY public.showtimes (id, movie_id, theater_id, start_time, date) FROM stdin;
    public          postgres    false    216   ?,       ,          0    16441    theater 
   TABLE DATA           ?   COPY public.theater (id, name, capacity, features) FROM stdin;
    public          postgres    false    215   J-       .          0    16463    ticket 
   TABLE DATA           T   COPY public.ticket (id, price, movie_id, show_id, seat_id, customer_id) FROM stdin;
    public          postgres    false    217   ?-       ?           2606    16484    customer customer_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
       public            postgres    false    218            ?           2606    16440    movie movie_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.movie DROP CONSTRAINT movie_pkey;
       public            postgres    false    214            ?           2606    16501    rating rating_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.rating DROP CONSTRAINT rating_pkey;
       public            postgres    false    220            ?           2606    16489    seat seat_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.seat
    ADD CONSTRAINT seat_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.seat DROP CONSTRAINT seat_pkey;
       public            postgres    false    219            ?           2606    16452    showtimes show_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.showtimes
    ADD CONSTRAINT show_pkey PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.showtimes DROP CONSTRAINT show_pkey;
       public            postgres    false    216            ?           2606    16447    theater theater_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.theater
    ADD CONSTRAINT theater_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.theater DROP CONSTRAINT theater_pkey;
       public            postgres    false    215            ?           2606    16467    ticket ticket_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_pkey;
       public            postgres    false    217            ?           2606    16507    rating rating_customer_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id);
 H   ALTER TABLE ONLY public.rating DROP CONSTRAINT rating_customer_id_fkey;
       public          postgres    false    218    220    3471            ?           2606    16502    rating rating_movie_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id);
 E   ALTER TABLE ONLY public.rating DROP CONSTRAINT rating_movie_id_fkey;
       public          postgres    false    3463    214    220            ?           2606    16490    seat seat_theater_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.seat
    ADD CONSTRAINT seat_theater_id_fkey FOREIGN KEY (theater_id) REFERENCES public.theater(id);
 C   ALTER TABLE ONLY public.seat DROP CONSTRAINT seat_theater_id_fkey;
       public          postgres    false    219    215    3465            ?           2606    16453    showtimes show_movie_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.showtimes
    ADD CONSTRAINT show_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id);
 F   ALTER TABLE ONLY public.showtimes DROP CONSTRAINT show_movie_id_fkey;
       public          postgres    false    214    216    3463            ?           2606    16458    showtimes show_theater_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.showtimes
    ADD CONSTRAINT show_theater_id_fkey FOREIGN KEY (theater_id) REFERENCES public.theater(id);
 H   ALTER TABLE ONLY public.showtimes DROP CONSTRAINT show_theater_id_fkey;
       public          postgres    false    215    216    3465            ?           2606    16541    ticket ticket_customer_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id);
 H   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_customer_id_fkey;
       public          postgres    false    217    218    3471            ?           2606    16468    ticket ticket_movie_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id);
 E   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_movie_id_fkey;
       public          postgres    false    217    214    3463            ?           2606    16536    ticket ticket_seat_id_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_seat_id_fkey FOREIGN KEY (seat_id) REFERENCES public.seat(id);
 D   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_seat_id_fkey;
       public          postgres    false    217    219    3473            ?           2606    16473    ticket ticket_show_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_show_id_fkey FOREIGN KEY (show_id) REFERENCES public.showtimes(id);
 D   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_show_id_fkey;
       public          postgres    false    216    3467    217            /   ?   x?}ν
? ???|
 ???ܚ?)?)t???B,?h??U??,????!?????????V?cAf?
\ȼ(??n?C?EYG?-???l??2z??	W?????b?"?M]???H8y?j????+E
O?Tڌ8?????*??)!|#aN8?ȍB??o_l      +   ?  x?=R?n?0>?O????I?昭@??2lvم?K?-
??}??v닍???D?#??5o????[v?FMQ<??zs?ۭiv?yN8?y?1?)&?9P8q耯? !??I|??0?;8????C?-*??d??.?x???\?-O?^wd)??4??v????QRu???l?vg??????D+??Q??d]??8???J?	?0??0?3???A?６?j?,>?J??חD?l??)M??ڭ?Ϙ?|?Ĵ??S???ͣiZs?k???TR+a?o0?w?<hp?D8dpxe??e?&??/Ǒ????|B???4g??,EQ??(?^??z???x??[ͽ̍n?kQ????x??/??.N???-???1?s¬}?U͖??7?uӘ?ݛc?.6?9*3ϱL????/?f-?t??sIX???.洀~?8?|"???{?{w??5?$??y???K@w&+??q??7?rT@??/C4Ͷ?y_U?af      1   ?  x????n?0???Sl?q?8N?>???˚ZJ?R$A??????%?H???Ť?of???=???}τS\?>?ϑ?$???9?R?L??a,?0? ???|?3?????+s߽t??ǅ?I.?p;bF+?W?????I?o???46??
~V???=????t???????:gzlj?Tw+?̉??&?p?ѯ&?̡??A?T??c):??'?2?4??1?A??v!?opˁ&?8dL?5??,?fo^?}˽2?JD?/??Z????Opf?V????]?K\?S??1Y?[}?Y-?Џ0??rb?????8??e??????n???,N?/????*?D?Q??
??6????-u??mY?g??h????j4?H9^?t?hh????vy??	j9?|S?5y?
?B???u?z~k??!??h?y?&#V      0   t   x?]л?@D?z?1???D<jZ??V?Q?_L;??זW8?{???u|??!?R?H?4ᮭ?Om???O?3??.X???G???|???????y???&??G???R????L?      -   W   x?e???0?3?%Nȧ?%??Q??D?ēF?Q????eaC?WC?{???,ݯxg?$ï?/N???|??!?????<"?      ,   a   x?3??HM,I-R0?420??6v???u???2??q?eL?k????Ɯ? ?JA??9?y?y?
?@?b?Z.?N?>%?ҊҢJ?<PPE? *B"?      .   P   x?M̹?0Cњƈ???????aP!??+?@??7??G??PZ??!Z?p8?y/0D6f???????g???'?     