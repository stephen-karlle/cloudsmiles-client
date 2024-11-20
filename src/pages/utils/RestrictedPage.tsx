import { getRedirectLink } from "@features/guest/authentication/login/utils/login.utils";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import ArrowIcon from "@icons/linear/ArrowIcon";
import { useUserStore } from "@stores/user.store";


const RestrictedPage = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const redirectLink = getRedirectLink(user.role);

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <span className="px-2 py-1 rounded-full bg-lime-50 text-lime-500 text-xs uppercase mb-4">404 Error</span>
      <h1 className="text-4xl font-semibold text-gray-800">Page Not Found</h1>
      <p className="text-gray-500 text-center text-sm font-normal mt-4">
        We can't seem to find the page you're looking for. <br />
        Probably the link is broken or the page has been moved.
      </p>
      <Button className="mt-8" onClick={() => navigate(redirectLink)}>
        Take me back
        <ArrowIcon className="w-5 h-5 -rotate-90 stroke-2 stroke-white" />
      </Button>
    </main>
  );
};

export default RestrictedPage;
