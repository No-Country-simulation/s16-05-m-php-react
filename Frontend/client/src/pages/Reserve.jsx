import React from "react";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useReserveStore from "@/stores/useReserveStore";

const Reserve = () => {
  const {
    date,
    time,
    owner_first_name,
    owner_last_name,
    owner_phone_number,
    owner_email,
    attendee_count,
    setDate,
    setTime,
    setOwner_first_name,
    setOwner_last_name,
    setOwner_phone_number,
    setOwner_email,
    setAttendee_count,
  } = useReserveStore();

  const navigate = useNavigate();

  const generateNextSevenDays = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => addDays(today, i));
  };

  const nextSevenDays = generateNextSevenDays();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de enviar los datos al backend si necesitas en este punto
    navigate("/table");
  };

  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/select");
  };

  return (
    <div className="flex min-h-[100dvh] h-[auto] mt-5 flex-col gap-11 flex-wrap font-title items-center justify-center max-w-[600px] mx-[auto] my-[0px] bg-[#272727]">
      <p className="font-bold text-2xl font-title">Reserva tu mesa</p>
      <div className="flex flex-col p-2 gap-5">
        <div className="flex flex-col">
          <p>Fecha de reserva</p>
          <Select onValueChange={setDate}>
            <SelectTrigger className="w-[280px] bg-color-bg  border-color-secondary">
              <SelectValue placeholder="Fecha" />
            </SelectTrigger>
            <SelectContent>
              {nextSevenDays.map((date, index) => (
                <SelectItem key={index} value={format(date, "yyyy-MM-dd")}>
                  {format(date, "eeee, dd MMMM yyyy", { locale: es })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <p>Horario de la reserva</p>
          <Select onValueChange={setTime}>
            <SelectTrigger className="w-[280px] bg-color-bg border-color-secondary">
              <SelectValue placeholder="Horario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="19:00">19 a 20 hs</SelectItem>
              <SelectItem value="20:00">20 a 21 hs</SelectItem>
              <SelectItem value="21:00">21 a 22 hs</SelectItem>
              <SelectItem value="22:00">22 a 23 hs</SelectItem>
              <SelectItem value="23:00">23 a 00 hs</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <p>Cantidad de personas</p>
          <Select
            onValueChange={(value) => setAttendee_count(parseInt(value))}
          >
            <SelectTrigger className="w-[280px] bg-color-bg border-color-secondary">
              <SelectValue placeholder="Personas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <p>Nombre</p>
          <Input
            className="bg-color-bg border-color-secondary"
            value={owner_first_name}
            onChange={(e) => setOwner_first_name(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <p>Apellido</p>
          <Input
            className="bg-color-bg border-color-secondary"
            value={owner_last_name}
            onChange={(e) => setOwner_last_name(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <p>Celular</p>
          <Input
            className="bg-color-bg border-color-secondary"
            value={owner_phone_number}
            onChange={(e) => setOwner_phone_number(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <p>Email</p>
          <Input
            className="bg-color-bg border-color-secondary"
            type="email"
            value={owner_email}
            onChange={(e) => setOwner_email(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center gap-[20px] w-[100%] mb-[20px]">
        <Button
          className="bg-color-secondary w-[40%] font-bold font-title hover:bg-color-secondary px-[20px] py-[10px] text-[#000] border border-[#900B09]"
          onClick={handleReturn}
        >
          CANCELAR
        </Button>
        <Button
          className="bg-color-primary w-[40%] font-bold font-title hover:bg-color-primary px-[20px] py-[10px] border border-[#900B09]"
          onClick={handleSubmit}
        >
          CONTINUAR
        </Button>
      </div>
    </div>
  );
};

export default Reserve;
