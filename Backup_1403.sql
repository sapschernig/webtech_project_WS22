PGDMP     9                    {            movie_db    15.1    15.1 '    G           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            H           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            I           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            J           1262    16399    movie_db    DATABASE     j   CREATE DATABASE movie_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE movie_db;
                postgres    false                        3079    16546 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            K           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
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
            public          postgres    false    219            �            1259    16434    movie    TABLE       CREATE TABLE public.movie (
    id integer NOT NULL,
    title character varying(255),
    release_date date,
    duration integer,
    genre character varying(255),
    description character varying(255),
    age_restriction integer,
    picture character varying(255)
);
    DROP TABLE public.movie;
       public         heap    postgres    false            �            1259    16495    rating    TABLE     �   CREATE TABLE public.rating (
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
       public         heap    postgres    false            �            1259    16441    theater    TABLE     �   CREATE TABLE public.theater (
    id integer NOT NULL,
    name character varying(255),
    capacity integer,
    features character varying[]
);
    DROP TABLE public.theater;
       public         heap    postgres    false            �            1259    16463    ticket    TABLE     �   CREATE TABLE public.ticket (
    id integer NOT NULL,
    price numeric(5,2),
    show_id integer,
    seat_id integer,
    customer_id integer,
    quantity integer DEFAULT 1
);
    DROP TABLE public.ticket;
       public         heap    postgres    false            @          0    16478    customer 
   TABLE DATA           v   COPY public.customer (first_name, last_name, email, phone, address, password, zipcode, city, country, id) FROM stdin;
    public          postgres    false    219   ,       <          0    16434    movie 
   TABLE DATA           p   COPY public.movie (id, title, release_date, duration, genre, description, age_restriction, picture) FROM stdin;
    public          postgres    false    215   w-       B          0    16495    rating 
   TABLE DATA           K   COPY public.rating (id, movie_id, customer_id, rating, review) FROM stdin;
    public          postgres    false    221   �/       A          0    16485    seat 
   TABLE DATA           N   COPY public.seat (id, "row", number, type, removable, theater_id) FROM stdin;
    public          postgres    false    220   F1       D          0    16603    sessions 
   TABLE DATA           5   COPY public.sessions (sid, sess, expire) FROM stdin;
    public          postgres    false    223   �1       >          0    16448 	   showtimes 
   TABLE DATA           O   COPY public.showtimes (id, movie_id, theater_id, start_time, date) FROM stdin;
    public          postgres    false    217   �1       =          0    16441    theater 
   TABLE DATA           ?   COPY public.theater (id, name, capacity, features) FROM stdin;
    public          postgres    false    216   N2       ?          0    16463    ticket 
   TABLE DATA           T   COPY public.ticket (id, price, show_id, seat_id, customer_id, quantity) FROM stdin;
    public          postgres    false    218   �2       L           0    0    customer_id1_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.customer_id1_seq', 9, true);
          public          postgres    false    222            �           2606    16601    customer customer_pkey 
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
       public          postgres    false    215    221    3480            �           2606    16490    seat seat_theater_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.seat
    ADD CONSTRAINT seat_theater_id_fkey FOREIGN KEY (theater_id) REFERENCES public.theater(id);
 C   ALTER TABLE ONLY public.seat DROP CONSTRAINT seat_theater_id_fkey;
       public          postgres    false    216    220    3482            �           2606    16453    showtimes show_movie_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.showtimes
    ADD CONSTRAINT show_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id);
 F   ALTER TABLE ONLY public.showtimes DROP CONSTRAINT show_movie_id_fkey;
       public          postgres    false    217    3480    215            �           2606    16458    showtimes show_theater_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.showtimes
    ADD CONSTRAINT show_theater_id_fkey FOREIGN KEY (theater_id) REFERENCES public.theater(id);
 H   ALTER TABLE ONLY public.showtimes DROP CONSTRAINT show_theater_id_fkey;
       public          postgres    false    217    216    3482            �           2606    16536    ticket ticket_seat_id_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_seat_id_fkey FOREIGN KEY (seat_id) REFERENCES public.seat(id);
 D   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_seat_id_fkey;
       public          postgres    false    220    3490    218            �           2606    16473    ticket ticket_show_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_show_id_fkey FOREIGN KEY (show_id) REFERENCES public.showtimes(id);
 D   ALTER TABLE ONLY public.ticket DROP CONSTRAINT ticket_show_id_fkey;
       public          postgres    false    217    218    3484            @   T  x���Mo�@�ϳ��{#�?���[{��yY`�-�k`���wQے�CCB����eލ*$D
������ׇ
�T���ğ�'�e05���BZ�6L{ZC0u�ʓVG	oq[��Z��ح�߬.��j�I�a>V�,�D�������s��6�,M�X��x�����\��r1��1v�,�=Aԥ%d�p��V��>��P_�������n�U#��)ɫl��|߻������E�9����(޵d�,�/�[���&����}�%�"�oJ��v��(��v�n�ۊ�����<�������N.�9�%m`�BjC�o��_�����K|�v6c�R�      <     x�=�Mn1���)x���;q�t @�)� �tCk��G$������.+�����|�j�6��j��aP�ᰭ6OU]��٫c{!��@�]���!j+�6��l 1�Gt-Xg�d�pZ���#�!�!%
���������FR{;ϝ5��(�T��<���7\1Dʢ�����z����X^��[5��|7x�� ߨ��'�.'�U�C�lU�k�K�	����N>��NlN����/ ���I�u!�� g�$G�G�9$28B���F���F^k�&9nI�Ӌ��T�[,����+�gL��x�7�f[5;U���`'*�rw�)X��ڂ�C���$��Jh�1-��x�b���c�+�<��:�lez2�|h�uB�d�̞Uw7U��_��LR�f�\m��d�u��C�e����� c9{�A�^����u����������WN���i����p��h�"�;��$��h�#wV�Lr]o�X6�>���mf�2T	"����V��P�$J���z�Z�q�      B   �  x����n�0���Sl�q�8N�>���˚ZJ�R$A������%�H���Ť�of���=���}τS\�>�ϑ�$���9�R�L��a,�0� ���|�3�����+s߽t?�ǅ�I.�p;bF+�W�����I�o��46��
~V��=����t�������:gzlj�Tw+�̉��&�p�ѯ&�̡��A�T��c):��'�2�4�1�A��v!�opˁ&�8dL�5��,�fo^�}˽2�JD�/��Z����Opf�V����]�K\�S��1Y�[}�Y-�Џ0�rb�����8�e������n���,N�/����*�D�Q��
��6����-u��mY�g��h����j4�H9^�t�hh����vy��	j9�|S�5y�
�B���u�z~k��!��h�y�&#V      A   t   x�]л�@D�z�1?��D<jZ��V�Q�_L;��זW8�{���u|��!�R�H�4ᮭ�Om���O�3��.X���G���|������y���&��G���R����L�      D      x������ � �      >   W   x�e���0�3�%Nȧ�%��Q�D�ēF�Q����eaC�WC�{���,ݯxg�$ï�/N���|��!�����<"�      =   a   x�3��HM,I-R0�420�6v���u���2��q�eL�k���Ɯ� �JA��9�y�y�
�@�b�Z.�N�>%�ҊҢJ�<PPE� *B"�      ?   N   x�=ι�0Cњ�e��%��Y�_�� =��V�H���ٵ�#q�G�'��3���r��y�ع?������ ��     