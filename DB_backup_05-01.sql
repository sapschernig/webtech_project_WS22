PGDMP          2                 {            movie_db    15.1    15.1     4           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            5           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            6           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            7           1262    16399    movie_db    DATABASE     j   CREATE DATABASE movie_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE movie_db;
                postgres    false            /          0    16478    customer 
   TABLE DATA           T   COPY public.customer (id, first_name, last_name, email, phone, address) FROM stdin;
    public          postgres    false    218   #	       +          0    16434    movie 
   TABLE DATA           g   COPY public.movie (id, title, release_date, duration, genre, description, age_restriction) FROM stdin;
    public          postgres    false    214   �	       1          0    16495    rating 
   TABLE DATA           K   COPY public.rating (id, movie_id, customer_id, rating, review) FROM stdin;
    public          postgres    false    220   �       0          0    16485    seat 
   TABLE DATA           N   COPY public.seat (id, "row", number, type, removable, theater_id) FROM stdin;
    public          postgres    false    219   E       -          0    16448    show 
   TABLE DATA           J   COPY public.show (id, movie_id, theater_id, start_time, date) FROM stdin;
    public          postgres    false    216   �       ,          0    16441    theater 
   TABLE DATA           ?   COPY public.theater (id, name, capacity, features) FROM stdin;
    public          postgres    false    215          .          0    16463    ticket 
   TABLE DATA           T   COPY public.ticket (id, price, movie_id, show_id, seat_id, customer_id) FROM stdin;
    public          postgres    false    217   �       /   �   x�}̽� ���p\@K��&Ʃ�qs��$���$��ѕ._�oy$�4E8�=�����cF1R �tۭ7�v�_����GnS�M�$zņ_�a
z���Xb$�0�4�>M0� ��j��<�3���+��i�JV��`�}V�      +   �  x�=��n�0���S���rҦ9�+P��[�]vad��b��('�~���&J���$kޗ�"��W�Wc��]�=����i�Q*K&s�1�2_@\�� E 3�h��0��s(4�y�!$\��kz��	�{���t�o4P�K�T��mwl����޼f�h>�!�9')��U�o�!-���fy�KH�7�������-N��kA�e�N3�m�1��@��[�}jv��7.X<euw��n��{c��s���ތ%���i
��)�Vˮv°&��Bɘ�BYT2��S��A�
���D�.�rU��$Ӵ���X*��f���k��F_L�u�mwh퓱��9��O5)Uj�5�=ʶ��WwτW�7v,瑕��{3�<Qu���c|�,Q��E��s4��:j��ӊf�YV�y�18�^��~�����/�~�)T*��A��������h~~j���)�      1   �  x����n�0���Sl�q�8N�>���˚ZJ�R$A������%�H���Ť�of���=���}τS\�>�ϑ�$���9�R�L��a,�0� ���|�3�����+s߽t?�ǅ�I.�p;bF+�W�����I�o��46��
~V��=����t�������:gzlj�Tw+�̉��&�p�ѯ&�̡��A�T��c):��'�2�4�1�A��v!�opˁ&�8dL�5��,�fo^�}˽2�JD�/��Z����Opf�V����]�K\�S��1Y�[}�Y-�Џ0�rb�����8�e������n���,N�/����*�D�Q��
��6����-u��mY�g��h����j4�H9^�t�hh����vy��	j9�|S�5y�
�B���u�z~k��!��h�y�&#V      0   t   x�]л�@D�z�1?��D<jZ��V�Q�_L;��זW8�{���u|��!�R�H�4ᮭ�Om���O�3��.X���G���|������y���&��G���R����L�      -   =   x�]ɻ�0њ�Ł(�A�Y����»���f;�y4SS2p��ә8���R����|H.�D�      ,   a   x�3��HM,I-R0�420�6v���u���2��q�eL�k���Ɯ� �JA��9�y�y�
�@�b�Z.�N�>%�ҊҢJ�<PPE� *B"�      .   P   x�M̹�0Cњƈ�������aP!��+�@��7��G��PZ��!Z�p8�y/0D6f�������g���'�     