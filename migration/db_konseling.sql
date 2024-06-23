-- public.konselor definition

-- Drop table

-- DROP TABLE public.konselor;

CREATE TABLE public.konselor (
	id serial4 NOT NULL,
	nama varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	bidang varchar(100) NOT NULL,
	nomor_telepon varchar(20) NULL,
	alamat varchar(255) NULL,
	status_aktif bool DEFAULT true NULL,
	CONSTRAINT konselor_email_key UNIQUE (email),
	CONSTRAINT konselor_pkey PRIMARY KEY (id)
);

-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" varchar(255) NULL,
	email varchar(255) NULL,
	"password" varchar(255) NULL,
	refresh_token varchar(255) NULL,
	"role" public."enum_users_role" DEFAULT 'siswa'::enum_users_role NOT NULL,
	updated_at timestamp DEFAULT now() NULL,
	created_at timestamp DEFAULT now() NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- public.students definition

-- Drop table

-- DROP TABLE public.students;

CREATE TABLE public.students (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	"name" varchar(255) NULL,
	tanggal_lahir date NULL,
	alamat varchar(255) NULL,
	jenis_kelamin_id int4 NULL,
	kelas_id int4 NULL,
	CONSTRAINT students_pkey PRIMARY KEY (id),
	CONSTRAINT students_user_id_key UNIQUE (user_id)
);


-- public.students foreign keys

ALTER TABLE public.students ADD CONSTRAINT fk_jenis_kelamin FOREIGN KEY (jenis_kelamin_id) REFERENCES public.gender(id);
ALTER TABLE public.students ADD CONSTRAINT fk_kelas_id FOREIGN KEY (kelas_id) REFERENCES public.kelas(id);
ALTER TABLE public.students ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.students ADD CONSTRAINT fk_user_id_cascade FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- public.konseling definition

-- Drop table

-- DROP TABLE public.konseling;

CREATE TABLE public.konseling (
	id serial4 NOT NULL,
	student_id int4 NULL,
	konselor_id int4 NULL,
	judul varchar(255) NULL,
	deskripsi text NULL,
	status varchar(50) NULL,
	requested_date timestamp NULL,
	scheduled_date timestamp NULL,
	CONSTRAINT konseling_pkey PRIMARY KEY (id),
	CONSTRAINT konseling_konselor_id_fkey FOREIGN KEY (konselor_id) REFERENCES public.konselor(id),
	CONSTRAINT konseling_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE
);


-- public.pelanggaran definition

-- Drop table

-- DROP TABLE public.pelanggaran;

CREATE TABLE public.pelanggaran (
	id serial4 NOT NULL,
	student_id int4 NOT NULL,
	kelas varchar(20) NOT NULL,
	pelanggaran varchar(255) NOT NULL,
	poin int4 NOT NULL,
	deskripsi text NULL,
	prosedur_konseling text NULL,
	CONSTRAINT pelanggaran_pkey PRIMARY KEY (id),
	CONSTRAINT pelanggaran_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE
);

-- public.kelas definition

-- Drop table

-- DROP TABLE public.kelas;

CREATE TABLE public.kelas (
	id serial4 NOT NULL,
	nama_kelas varchar(50) NOT NULL,
	CONSTRAINT kelas_pkey PRIMARY KEY (id)
);

-- public.gender definition

-- Drop table

-- DROP TABLE public.gender;

CREATE TABLE public.gender (
	id serial4 NOT NULL,
	jenis_kelamin varchar(20) NOT NULL,
	CONSTRAINT gender_pkey PRIMARY KEY (id)
);