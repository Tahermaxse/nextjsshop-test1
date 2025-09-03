export interface Section {
  id: string;
  title: string;
  content: JSX.Element;
}

export interface Main{
  mainparagraph?: JSX.Element;
}

export interface Footer{
  footer?: JSX.Element;
}