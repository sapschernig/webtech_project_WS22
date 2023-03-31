PGDMP         (                {           movie_db    15.1    15.1 -    N           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            O           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            P           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Q           1262    16399    movie_db    DATABASE     j   CREATE DATABASE movie_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE movie_db;
                postgres    false                        3079    16546 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            R           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    16478    customer    TABLE     N  CREATE TABLE public.customer (
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    phone character varying,
    address character varying,
    password character varying(255),
    zipcode character varying(10),
    city text,
    country text,
    id integer NOT NULL
);
    DROP TABLE public.customer;
       public         heap    postgres    false            �            1259    16599    customer_id1_seq    SEQUENCE     �   ALTER TABLE public.customer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customer_id1_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    16616    movie_id_seq    SEQUENCE     u   CREATE SEQUENCE public.movie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.movie_id_seq;
       public          postgres    false            �            1259    16434    movie    TABLE     B  CREATE TABLE public.movie (
    id integer DEFAULT nextval('public.movie_id_seq'::regclass) NOT NULL,
    title character varying(255),
    release_date date,
    duration integer,
    genre character varying(255),
    description character varying(255),
    age_restriction integer,
    picture character varying(255)
);
    DROP TABLE public.movie;
       public         heap    postgres    false    224            �            1259    16495    rating    TABLE     �   CREATE TABLE public.rating (
    id integer NOT NULL,
    movie_id integer,
    customer_id integer,
    rating integer,
    review text
);
    DROP TABLE public.rating;
       public         heap    postgres    false            �            1259    16485    seat    TABLE     �   CREATE TABLE public.seat (
    id integer NOT NULL,
    "row" character varying,
    number integer,
    type character varying(255),
    removable boolean,
    theater_id integer
);
    DROP TABLE public.seat;
       public         heap    postgres    false            �            1259    16603    sessions    TABLE     �   CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            �            1259    16448 	   showtimes    TABLE     �   CREATE TABLE public.showtimes (
    id integer NOT NULL,
    movie_id integer,
    theater_id integer,
    start_time time without time zone,
    date date
);
    DROP TABLE public.showtimes;
       public         heap    postgres    false            �            1259    16625    showtimes_id_seq1    SEQUENCE     �   ALTER TABLE public.showtimes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.showtimes_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16630    theater_id_seq    SEQUENCE     w   CREATE SEQUENCE public.theater_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.theater_id_seq;
       public          postgres    false            �            1259    16441    theater    TABLE     �   CREATE TABLE public.theater (
    id integer DEFAULT nextval('public.theater_id_seq'::regclass) NOT NULL,
    name character varying(255),
    capacity integer,
    features character varying[]
);
    DROP TABLE public.theater;
       public         heap    postgres    false    226            �            1259    16463    ticket    TABLE     �   CREATE TABLE public.ticket (
    id integer NOT NULL,
    price numeric(5,2),
    show_id integer,
    seat_id integer,
    customer_id integer
);
    DROP TABLE public.ticket;
       public         heap    postgres    false            D          0    16478    customer 
   TABLE DATA           v   COPY public.customer (first_name, last_name, email, phone, address, password, zipcode, city, country, id) FROM stdin;
    public          postgres    false    219   r2       @          0    16434    movie 
   TABLE DATA           p   COPY public.movie (id, title, release_date, duration, genre, description, age_restriction, picture) FROM stdin;
    public          postgres    false    215   �3       F          0    16495    rating 
   TABLE DATA           K   COPY public.rating (id, movie_id, customer_id, rating, review) FROM stdin;
    public          postgres    false    221   Q6       E          0    16485    seat 
   TABLE DATA           N   COPY public.seat (id, "row", number, type, removable, theater_id) FROM stdin;
    public          postgres    false    220   8       H          0    16603    sessions 
   TABLE DATA           5   COPY public.sessions (sid, sess, expire) FROM stdin;
    public          postgres    false    223   �8       B          0    16448 	   showtimes 
   TABLE DATA           O   COPY public.showtimes (id, movie_id, theater_id, start_time, date) FROM stdin;
    public          postgres    false    217   �8       A          0    16441    theater 
   TABLE DATA           ?   COPY public.theater (id, name, capacity, features) FROM stdin;
    public          postgres    false    216   9       C          0    16463    ticket 
   TABLE DATA           J   COPY public.ticket (id, price, show_id, seat_id, customer_id) FROM stdin;
    public          postgres    false    218   �9       S           0    0    customer_id1_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.customer_id1_seq', 10, true);
          public          postgres    false    222            T           0    0    movie_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.movie_id_seq', 22, true);
          public          postgres    false    224            U           0    0    showtimes_id_seq1    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.showtimes_id_seq1', 9, true);
          public          postgres    false    225            V           0    0    theater_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.theater_id_seq', 10, true);
          public          postgres    false    226            �           2606    16601    customer customer_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
       public            postgres    false    219            �           2606    16440    movie movie_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.movie DROP CONSTRAINT movie_pkey;
       public            postgres    false    215            �           2606    16501    rating rating_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.rating DROP CONSTRAINT rating_pkey;
       public            postgres    false    221            �           2606    16489    seat seat_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.seat
    ADD CONSTRAINT seat_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.seat DROP CONSTRAINT seat_pkey;
       public            postgres    false    220            �           2606    16609    sessions sessions_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    223            �           2606    16452    showtimes show_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.showtimes
    ADD CONSTRAINT show_pkey PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.showtimes DROP CONSTRAINT show_pkey;
       public            postgres    false    217            �           2606    16447    theater theater_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.theater
    ADD CONSTRAINT theater_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.theater DROP CONSTRAINT theater_pkey;
       public            postgres    false    216            �           2606    16467    ticket ticket_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_pkey;
       public            postgres    false    218            �           1259    16610    idx_sessions_expire    INDEX     J   CREATE INDEX idx_sessions_expire ON public.sessions USING btree (expire);
 '   DROP INDEX public.idx_sessions_expire;
       public            postgres    false    223            �           2606    16502    rating rating_movie_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id);
 E   ALTER TABLE ONLY public.rating DROP CONSTRAINT rating_movie_id_fkey;
       public          postgres    false    215    3484    221            �           2606    16490    seat seat_theater_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.seat
    ADD CONSTRAINT seat_theater_id_fkey FOREIGN KEY (theater_id) REFERENCES public.theater(id);
 C   ALTER TABLE ONLY public.seat DROP CONSTRAINT seat_theater_id_fkey;
       public          postgres    false    216    220    3486            �           2606    16453    showtimes show_movie_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.showtimes
    ADD CONSTRAINT show_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id);
 F   ALTER TABLE ONLY public.showtimes DROP CONSTRAINT show_movie_id_fkey;
       public          postgres    false    3484    217    215            �           2606    16458    showtimes show_theater_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.showtimes
    ADD CONSTRAINT show_theater_id_fkey FOREIGN KEY (theater_id) REFERENCES public.theater(id);
 H   ALTER TABLE ONLY public.showtimes DROP CONSTRAINT show_theater_id_fkey;
       public          postgres    false    3486    216    217            �           2606    16536    ticket ticket_seat_id_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_seat_id_fkey FOREIGN KEY (seat_id) REFERENCES public.seat(id);
 D   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_seat_id_fkey;
       public          postgres    false    220    218    3494            �           2606    16473    ticket ticket_show_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_show_id_fkey FOREIGN KEY (show_id) REFERENCES public.showtimes(id);
 D   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_show_id_fkey;
       public          postgres    false    217    3488    218            D   y  x���KR�@��=�`o�
�<؅nԸ���4Lǌ��Js����qaQ_7���a�
C��JCz�汦�2Dq2J'��l��}�P�`�<s�ې��1�z�̓��u�X�֍r[(MZO�Yc��ъe%i3T�"�UE�=��&���Q�!Y�8�&�5�o�pj���l>�NR1t��@e�Pt���P2.�����Y���es(��y^��jE�֙(��Z����.�!�D�A�E�D|��v���Y����b�-nᆬ�q�CtߵW�#�$=b����k�'��Zyg]�&b��OX�͡_�#����;pw�jO�?cI�����L>�g"���?�a[)MR�T��������s���P����o��      @   F  x�=��n� ���S�đ��d�Ǵ�"�RU��z�e�6
x�΃��[^���f`���ǍxZƨ%|�0��p�V�m�4�i��;�MK qCp��C��7uL0D^@r�t4h;�V�Q'��B�����x)Q���a�j4�{3>��_���'�S)Pzt�7���!R.ʷ�8y�l��O�g�ף6�xV?��B;�w�h�I;����P�[��Z�pF�|v�gtt�e�d��X�;Q ��G�`�+��W�k�>�Π$�&��A��[�3�d6|[�y��$Y���Vċ�"{[d?��Ǥ(��}[�۪݉f#>=S)�!��1�A�ܛq�0�կl@�J�V�1����3L`Sp&�+��Ť-k֜�O�E&�$cfv'���"tWT<0n�b���h�����{jnZq/쟊2�D3�ɺ��e��M��
ON�R�cZ�<9o(�}tI�|�0��u^bb��|��R������J���Lr_��X�<^�`�9����ZKb�c�S1�1V<W�yS7l�ݖl�g��#hc8���S��X�μ�M��.���IG;��o�������f��12      F   �  x����n�0���Sl�q�8N�>���˚ZJ�R$A������%�H���Ť�of���=���}τS\�>�ϑ�$���9�R�L��a,�0� ���|�3�����+s߽t?�ǅ�I.�p;bF+�W�����I�o��46��
~V��=����t�������:gzlj�Tw+�̉��&�p�ѯ&�̡��A�T��c):��'�2�4�1�A��v!�opˁ&�8dL�5��,�fo^�}˽2�JD�/��Z����Opf�V����]�K\�S��1Y�[}�Y-�Џ0�rb�����8�e������n���,N�/����*�D�Q��
��6����-u��mY�g��h����j4�H9^�t�hh����vy��	j9�|S�5y�
�B���u�z~k��!��h�y�&#V      E   t   x�]л�@D�z�1?��D<jZ��V�Q�_L;��זW8�{���u|��!�R�H�4ᮭ�Om���O�3��.X���G���|������y���&��G���R����L�      H      x������ � �      B   `   x�e���0�᳽KQ���1��A����O��D�t^f��ͣ��;���G
9�s��^�X���"��G�)�~צ$��_:O���⽑| �t'}      A   a   x�3��HM,I-R0�420�6v���u���2��q�eL�k���Ɯ� �JA��9�y�y�
�@�b�Z.�N�>%�ҊҢJ�<PPE� *B"�      C   I   x�=˱�0C�Z���.��@é�+��g��h#��Gg@�2����#�ۣ]݁�8��Q=~��֓�     