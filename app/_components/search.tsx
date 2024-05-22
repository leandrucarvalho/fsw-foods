"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <div className="relative w-full bg-cover bg-center lg:h-[500px]">
      {/* Conteúdo visível apenas na versão desktop */}
      <div className="hidden h-full w-full flex-col justify-center bg-[url('/search-banner.png')] bg-cover bg-center px-4 text-left sm:px-8 lg:flex">
        <div className="w-[660px]">
          <h1 className="mb-3 text-5xl font-bold text-white">Está com fome?</h1>
          <p className="mb-8 text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
          <div className="flex h-[88px] w-[658px] items-center rounded-lg bg-white p-6">
            <form className="flex w-full" onSubmit={handleSearchSubmit}>
              <Input
                placeholder="Buscar restaurantes"
                className="flex-1 border-none"
                onChange={handleChange}
                value={search}
              />
              <Button
                size="icon"
                type="submit"
                className="relative bg-[#FFB100]"
              >
                <SearchIcon size={20} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Barra de pesquisa visível apenas na versão mobile */}
      <div className="flex w-full lg:hidden">
        <form className="flex w-full gap-2" onSubmit={handleSearchSubmit}>
          <Input
            placeholder="Buscar restaurantes"
            className="flex-1 border-none"
            onChange={handleChange}
            value={search}
          />
          <Button size="icon" type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Search;
